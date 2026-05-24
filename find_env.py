import glob
import json
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

dirs = glob.glob(r'C:\Users\kasau\.gemini\antigravity-ide\brain\*\.system_generated\logs\transcript.jsonl')
result = []
for d in dirs:
    try:
        with open(d, 'r', encoding='utf-8') as f:
            for line in f:
                if 'The above content shows the entire, complete file contents of the requested file.' in line and '.env' in line:
                    result.append((d, json.loads(line).get('content', '')))
    except Exception as e:
        pass

for r in result:
    if 'PORT=' in r[1] and 'JWT_SECRET' in r[1]:
        print(f'--- {r[0]} ---')
        print(r[1])
        print('\n')
