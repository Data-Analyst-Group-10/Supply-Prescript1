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
    # Target Column
    # ==============================

    target_column = "Shipping Mode"

    if target_column not in df.columns:
        print("Target column not found")
        print(df.columns)
        return


    y = df[target_column]


    # ==============================
    # Remove unwanted columns
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


    df.drop(
        columns=[col for col in drop_columns if col in df.columns],
        inplace=True
    )


    # Remove target column

    X = df.drop(
        target_column,
        axis=1
    )


    # ==============================
    # Encode Features
    # ==============================

    print("Encoding categorical columns...")

    label_encoders = {}


    # Fixed pandas warning
    categorical_columns = X.select_dtypes(
        include=["object", "string"]
    ).columns


    for col in categorical_columns:

        encoder = LabelEncoder()

        X[col] = encoder.fit_transform(
            X[col].astype(str)
        )

        label_encoders[col] = encoder



    # Encode target

    target_encoder = LabelEncoder()

    y = target_encoder.fit_transform(
        y.astype(str)
    )


    # ==============================
    # Train Test Split
    # ==============================

    X_train, X_test, y_train, y_test = train_test_split(

        X,
        y,
        test_size=0.2,
        random_state=42

    )


    # ==============================
    # Train XGBoost
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
    # Accuracy
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
    # Save Model
    # ==============================

    os.makedirs(
        os.path.dirname(model_path),
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