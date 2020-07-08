#!bin/bash

sed -i.old "s#baseURL: '.*#baseURL: 'http://52.47.86.14:3001/',#g" ../client/src/utils/api.js
CODE=$(cat ../client/src/utils/api.js | grep "baseURL: 'http://52.47.86.14:3001/'," | wc -l)

if [ $(cat ../client/src/utils/api.js | grep "baseURL: 'http://52.47.86.14:3001/'," | wc -l) = 1 ] ; then
  echo "IP adress successfully writed in ../client/src/utils/api.js" 
  return 0
 else   
  return 1
fi
