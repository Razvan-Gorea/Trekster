import pandas as pd

# Panda used here to combine two csv files and eliminate duplicates
df1 = pd.read_csv('../public/output.csv')
df2 = pd.read_csv('../public/output2.csv')
combined_df = pd.concat([df1, df2])
combined_df = combined_df.drop_duplicates(subset='TrailID')
combined_df.to_csv('../public/combined_output.csv', index=False)
