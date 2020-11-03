#!/bin/sh

ZIP=/usr/bin/zip
RM=/bin/rm
AWS=/usr/local/bin/aws

FUNCTION_NAME=tonyl-aws-graphql
PACKAGE_NAME=aws-lambda-graphql

echo "Packaging Lambda Function ..."
${ZIP} -qr ${PACKAGE_NAME}.zip ./*

echo "Updating Lambda Function ..."
${AWS} lambda update-function-code --function-name ${FUNCTION_NAME} --zip-file fileb://./${PACKAGE_NAME}.zip

${RM} -rf ${PACKAGE_NAME}.zip

