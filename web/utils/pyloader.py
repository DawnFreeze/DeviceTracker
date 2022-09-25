#!/usr/bin/python

import os
import re
import sys
import json
import aiohttp
import asyncio
import time
import json

from dotenv import load_dotenv

load_dotenv()
start_time = time.time()

proto = 'https'
host = os.getenv('API_HOST')

#proto = 'http'
#host = '127.0.0.1:9999'

f = open('../../../tracking-app/csvjson-min.json')
data = json.load(f)

async def main():

    async with aiohttp.ClientSession() as session:
        for x in data:
            async with session.post(proto + '://' + host + '/live/updatestatus', json=x,
                headers={'Host':host}) as resp:
                print('. update res [' + str(resp.status) + ']')

asyncio.run(main())
print("--- %s seconds ---" % (time.time() - start_time))
