import joblib
bundle = joblib.load('ml/model/xgboost_model.joblib')
print(bundle['features'][:40])
print('count', len(bundle['features']))
