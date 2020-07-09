#!bin/bash

sed -i.old "s#baseURL: '.*#baseURL: 'http://35.180.137.52:3001/',#g" ../client/src/utils/api.js
CODE=$(cat ../client/src/utils/api.js | grep "baseURL: 'http://35.180.137.52:3001/'," | wc -l)

if [ $(cat ../client/src/utils/api.js | grep "baseURL: 'http://35.180.137.52:3001/'," | wc -l) = 1 ] ; then
  echo "IP adress successfully writed in ../client/src/utils/api.js" 
  return 0
 else   
  return 1
fi
