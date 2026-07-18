import pandas as pd
import xgboost as xgb
import joblib
import os

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score


def train_model(data_path, model_path):

    print("Loading dataset...")

    df = pd.read_csv(data_path)

    print("Dataset shape:", df.shape)


    # ==============================
    # 1. Select Target Column
    # ==============================

    target_column = "Shipping Mode"

    if target_column not in df.columns:
        print("Target column not found")
        print(df.columns)
        return


    y = df[target_column]


    # ==============================
    # 2. Remove unwanted columns
    # ==============================

    drop_columns = [

        "Customer Email",
        "Customer Password",
        "Customer Fname",
        "Customer Lname",
        "Customer Street",
        "Product Image",
        "order date (DateOrders)",
        "shipping date (DateOrders)"

    ]


    for col in drop_columns:
        if col in df.columns:
            df.drop(col, axis=1, inplace=True)



    # Remove target from features

    X = df.drop(target_column, axis=1)



    # ==============================
    # 3. Convert categorical data
    # ==============================

    print("Encoding categorical columns...")


    label_encoders = {}


    for col in X.select_dtypes(include=["object"]).columns:

        encoder = LabelEncoder()

        X[col] = encoder.fit_transform(
            X[col].astype(str)
        )

        label_encoders[col] = encoder



    # Encode target

    target_encoder = LabelEncoder()

    y = target_encoder.fit_transform(y.astype(str))



    # ==============================
    # 4. Split Data
    # ==============================


    X_train, X_test, y_train, y_test = train_test_split(

        X,
        y,
        test_size=0.2,
        random_state=42

    )



    # ==============================
    # 5. Train XGBoost
    # ==============================


    print("Training model...")


    model = xgb.XGBClassifier(

        objective="multi:softmax",
        num_class=len(set(y)),
        eval_metric="mlogloss",
        random_state=42

    )


    model.fit(
        X_train,
        y_train
    )



    # ==============================
    # 6. Accuracy
    # ==============================


    prediction = model.predict(X_test)


    accuracy = accuracy_score(
        y_test,
        prediction
    )


    print(
        "Model Accuracy:",
        accuracy
    )



    # ==============================
    # 7. Save Model
    # ==============================


    os.makedirs(
        "ml/model",
        exist_ok=True
    )


    joblib.dump(

        {
            "model": model,
            "encoders": label_encoders,
            "target_encoder": target_encoder,
            "features": X.columns.tolist()

        },

        model_path

    )


    print("Model saved successfully")




if __name__ == "__main__":


    train_model(

        "dataset/DataCoSupplyChainDataset_cleaned (1).csv",

        "ml/model/xgboost_model.joblib"

    )