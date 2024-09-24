import json
from typing import Any

# Uses json editing to recursively enter arrays in the geometries and reverse the coordinates
def reverseArrays(data: Any) -> Any:
    if isinstance(data, list):
        if len(data) ==  2 and all(isinstance(item, (int, float)) for item in data):
            return data[::-1]
        else:
            return [reverseArrays(item) for item in data]
    elif isinstance(data, dict):
        return {key: reverseArrays(value) for key, value in data.items()}
    else:
        return data

with open('../public/geometries.json', 'r') as file:
    json_content = json.load(file)

modified_content = reverseArrays(json_content)

with open('../public/reversedCoords.json', 'w') as file:
    json.dump(modified_content, file, indent=2)
