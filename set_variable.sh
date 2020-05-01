# !/bin/bash
# deploy_config.sh
# This script updates Firebase Environment Variables at deployment
# Note that sed on OSX and sed in Linux operate different ways
# with OSX you have to pass a dummy blank file with -i like 'sed -i "" <s command> <file>'

sed -i 's/\(process.env.API_KEY\)/'$API_KEY'/' firebaseConfig.js
sed -i 's/\(process.env.AUTH_DOMAIN\)/'$AUTH_DOMAIN'/' firebaseConfig.js
sed -i 's/\(process.env.DATABASE_URL\)/'$DATABASE_URL'/' firebaseConfig.js
sed -i 's/\(process.env.PROJECT_ID\)/'$PROJECT_ID'/' firebaseConfig.js
sed -i 's/\(rocess.env.STORAGE_BUCKET\)/'$STORAGE_BUCKET'/' firebaseConfig.js
sed -i 's/\(process.env.MESSAGING_SENDER_ID\)/'$MESSAGING_SENDER_ID'/' firebaseConfig.js
sed -i 's/\(process.env.APP_ID\)/'$PROJECT_ID'/' firebaseConfig.js
sed -i 's/\(process.env.MEASUREMENT_ID\)/'$MEASUREMENT_ID'/' firebaseConfig.js