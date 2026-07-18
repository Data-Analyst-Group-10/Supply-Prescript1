import pandas as pd
import os

print("Current Folder:", os.getcwd())

df = pd.read_csv("dataset/DataCoSupplyChainDataset_cleaned.csv")

print(df.head())
print(df.columns)
