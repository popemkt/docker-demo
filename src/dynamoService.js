import constants from "./constants.json";
import key from "./key.json";
const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient(key);

const GetAllTasks = async () => {
  return new Promise((resolve, reject) => {
    try {
      const param = {
        TableName: constants.tableName
      };
      docClient.scan(param, function(err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const SaveTasks = async (task) => {
  return new Promise((resolve, reject) => {
    try {
      const param = {
        TableName: constants.tableName,
        Item: task
      };
      docClient.put(param, function(err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const DeleteTasks = async (taskid) => {
  return new Promise((resolve, reject) => {
    try {
      const param = {
        TableName: constants.tableName,
        Key: {
          id: taskid
        }
      };
      docClient.delete(param, function(err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};
var DynamodbService = {
  GetAllTasks: GetAllTasks,
  SaveTasks: SaveTasks,
  DeleteTasks: DeleteTasks
};
export default DynamodbService;
