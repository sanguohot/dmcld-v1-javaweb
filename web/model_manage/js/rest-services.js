/**
 * Created by Rainc on 14-11-18.
 */
angular
    .module('myApp.restServices', [ 'ngResource' ])

    .factory('SaveService',
    [ '$resource', '$http', function($resource, $http) {
        return {
            save : function(obj, cb) {
                var url = 'batchManager!saveBatch.action?';
                $http.post(url,obj)
                    .success(function(data, status) {
                        cb(data);
                    }).error(function(data, status) {
                        cb(data);
                    });
            }
        }
    } ])

    .factory(
    'CheckNameService',
    [
        '$resource',
        '$http',
        function($resource, $http) {
            return {
                checkname : function(name, domain_uuid, cb) {
                    var url = 'batchManager!checkBatchName.action?domainUuid='
                        + domain_uuid + "&name=" + name;
                    $http( {
                        method : 'GET',
                        url : url
                    }).success(function(data, status) {
                        cb(data);
                    }).error(function(data, status) {
                        cb(data);
                    });
                }
            }
        } ])

    .factory(
    'XmlStrServer',
    [
        '$http',
        function( $http) {
            return {
                getXml : function(filePath, cb) {
                    var url = '../' + filePath;
                    $http( {
                        method : 'GET',
                        url : url
                    }).success(function(data, status) {
                        cb(data);
                    }).error(function(data, status) {
                        cb(data);
                    });
                }
            }
        } ])