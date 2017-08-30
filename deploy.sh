# copy new packages by hand

rm -r ../shout-out-loud-deploy/server/build/* ../shout-out-loud-deploy/client/build/*

cd server/
npm run build
cd ..
cp -r server/build/* ../shout-out-loud-deploy/server/build/

cd client/
npm run build
cd ..
cp -r client/build/* ../shout-out-loud-deploy/client/build/

rm -r server/build client/build