from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class CRUDBase:
    def __init__(self, model):
        self.model = model

    def create(self, db_session, obj_in):
        db_obj = self.model(**obj_in)
        db_session.add(db_obj)
        db_session.commit()
        db_session.refresh(db_obj)
        return db_obj

    def read(self, db_session, obj_id):
        return db_session.query(self.model).filter(self.model.id == obj_id).first()

    def update(self, db_session, db_obj, obj_in):
        for key, value in obj_in.items():
            setattr(db_obj, key, value)
        db_session.commit()
        db_session.refresh(db_obj)
        return db_obj

    def delete(self, db_session, obj_id):
        db_obj = self.read(db_session, obj_id)
        if db_obj:
            db_session.delete(db_obj)
            db_session.commit()
        return db_obj