var app = angular.module('myApp', ['checklist-model','ngMessages','ngRoute']);

//----------------------------------------------router----------------------------------------------
app.config(function ($routeProvider) {
    $routeProvider
     .when('/Add', {
         templateUrl: '/Views/Add.html',
         controller: 'studCtrl'

     })
    $routeProvider
     .when('/List', {
         templateUrl: '/Views/List.html',
         controller: 'listCtrl'
     })

     .when('/Add/:sid', {
         templateUrl: '/Views/Add.html',
         controller: 'studCtrl'
     })
     .otherwise({
         redirectTo: '/Add'
     });
});

//-----------------------------------------end router ------------------------------------------------

<configuration>
  
  <appSettings>
    <add key="MongoDBServer" value="mongodb://localhost:27017" />
    <add key="DBName" value="StudentDB" />
  </appSettings>

//-----------------------------------------end web----------------------------------------

//-----------------------------------------Default----------------------------------------


<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="StudentRegistration.aspx.cs" Inherits="AdmissionCrudeApplication.Views.StudentRegistration" %>

<!DOCTYPE html>

<html>
<head>
         <title>Student Registation Details</title>   
    <link rel="stylesheet" href="/Styles/dashboard.css" />   
    <script src="../Scripts/angular.min.js" type="text/javascript"></script>
    <script src="../Scripts/angular-route.js" type="text/javascript"></script>
     <%--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>--%>
    <link href="../Styles/bootstrap.min.css" rel="stylesheet" type="text/css" />    
     <script src="../Scripts/angular-messages.js" type="text/javascript"></script>
    <script src="../app.js" type="text/javascript"></script>
    <script src="../router.js" type="text/javascript"></script>
    <script src="../Controller/StudentRegDetails.js" type="text/javascript"></script> 
    <script src="../Controller/ListStudentRegDetails.js" type="text/javascript"></script>  
    <script src="../Scripts/checklist-model.js" type="text/javascript"></script>    
    <script src="../Factories/studentRegFactory.js" type="text/javascript"></script>
    <script src="../JSON/Country.js" type="text/javascript"></script>
    <script src="../JSON/State.js" type="text/javascript"></script>
    <script src="../JSON/districtList.js" type="text/javascript"></script>
   

</head> 
<body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">               
                <a class="navbar-brand" href="#">Student Registration Form</a>
            </div>
        </div>
    </nav>
     <div class="container-fluid">
        <div class="row">
            <div class="col-md-2 sidebar">
                <ul class="nav nav-sidebar">
                    <li class="active"><a href="#">Menu <span class="sr-only">(current)</span></a></li>
                    <li><a href="#Add">Add new Student</a> </li>
                    <li><a href="#List">List Students</a> </li>
                   
                 
                </ul>
            </div>
            <div class="col-md-10 main">
                <div ng-view ng-app="myApp">
                    
                </div>
            </div>
        </div>
    </div>
</body>
</html>


//--------------------------------------- defualt end------------------------------------------------------------

//-----------------------------------------Add html----------------------------------------

<div>
    <form name="exampleForm" class="form-horizontal" role="form">
    <div class="page-header">
        <h1>
            {{PageName}}</h1>
    </div>
    <div class="form-group">
        <div class="control-label  col-md-2">
            <label>
                First Name :</label>
        </div>
        <div class="col-md-3">
            
            <input type="text" name="fname" class="form-control" placeholder="Enter First Name"
                ng-model="stud.fname" required />
          </div>
            <div class="form-group" ng-messages="exampleForm.fname.$error" ng-show="exampleForm.fname.$touched && exampleForm.fname.$invalid">
                <p ng-message="required">
                    This field is required
                </p>
            </div>
        
    </div>

    <div class="form-group">
        <div class="control-label col-md-2">
            <b>Last Name :</b></div>
        <div class="col-md-3">
            <input type="text" class="form-control" placeholder="Enter Last Name" ng-model="stud.lname" required>
        </div>
         <div class="form-group" ng-messages="exampleForm.fname.$error" ng-show="exampleForm.fname.$touched && exampleForm.fname.$invalid">
            <p ng-message="required">This field is required </p>
        </div>
    </div>

    <div class="form-group">
        <div class="control-label col-md-2">
            <b>Birth date :</b></div>
        <div class="col-md-3">
            <input type="date" class="form-control" ng-model="stud.bday">
        </div>
    </div>

     <div class="form-group">
        <div class="control-label col-md-2">
            <b>Country :</b></div>
        <div class="col-md-3">
            <select name="ddlCountry" class="form-control" ng-model="stud.address.country" ng-options="country as country.Country_Description for country in countryList track by country.pk_Country_ID" required>
                <option value="">-----selected-----</option>
            </select>
        </div>
         <div class="form-group" ng-messages="exampleForm.ddlCountry.$error" ng-show="exampleForm.ddlCountry.$touched && exampleForm.ddlCountry.$invalid">
            <p ng-message="required">This field is required </p>
        </div>
    </div>

    <div class="form-group">
        <div class="control-label col-md-2">
            <b>State :</b></div>
        <div class="col-md-3">
            <select class="form-control" ng-model="stud.address.state" ng-disabled="!stud.address.country"
                ng-options="state as state.State_Name for state in stateList|filter:{Country_ID:stud.address.country.pk_Country_ID}:true track by state.State_ID">
                <option value="">------Select------</option>
            </select>
        </div>
    </div>

     <div class="form-group">
        <div class="control-label col-md-2">
            <b>District :</b></div>
        <div class="col-md-3">
            <select class="form-control" ng-model="stud.address.district" ng-disabled="!stud.address.state"
                ng-options="district as district.District_Name for district in districtList|filter:{State_ID:stud.address.state.State_ID}:true |orderBy:'District_Name' track by district.District_ID">
                <option value="">------Select------</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <div class="control-label col-md-2">
            <b>Address :</b></div>
        <div class="col-md-4">
            <textarea ng-model="stud.address.firstline"></textarea>
        </div>
    </div>

    <div class="form-group">
        <div class="control-label col-md-2">
            <b>Gender :</b></div>
        <div class="col-md-6">
            <label class="radio-inline">
                <input type="radio" name="gender" value="Male" ng-model="stud.gender" required/>Male</label>
            <label class="radio-inline">
                <input type="radio" name="gender" value="Female" ng-model="stud.gender" required/>Female</label>
        </div>
         <div class="form-group" ng-messages="exampleForm.gender.$error" ng-show="exampleForm.gender.$touched && exampleForm.gender.$invalid">
            <p ng-message="required">This field is required </p>
        </div>
    </div>

    <div class="form-group">
        <div class="control-label col-md-2">
            <b>Hobbies :</b></div>
        <div class="col-md-8">
            <label class="checkbox-inline" ng-repeat="h in hobbyList">
                <input type="checkbox"  checklist-model="stud.hobbies" checklist-value="h" >
                {{h.name}}
            </label>
        </div>
    </div>
    <br /> 

    <div class="form-group">
        <div style="height: 30px">
        </div>
        <div align="center">
            <button type="submit" class="btn btn-info" ng-click="newStudent();" ng-disabled="!exampleForm.$valid">
                New</button>
            <button type="submit" class="btn btn-success" ng-click="saveStudent()">
                {{btnName}}
            </button>
            <button type="submit" class="btn btn-success" ng-click="saveStudentToLocal(stud)">
                Save To Local
            </button>
        </div>
    </div>
    <div>
    </div>
    </form>
</div>

//------------------------------------------------end add html--------------------------------------------------


//------------------------------------------------add controller--------------------------------------------------

app.controller('studCtrl', function ($scope, studentregFactory, $routeParams, $rootScope) {


    //assign all hobbies
    $scope.hobbyList = [{ "name": "drawing" }, { "name": "singing" }, { "name": "painting"}];

    $scope.countryList = countryList;
    $scope.stateList = stateList;
    $scope.districtList = districtList;


    $scope.saveStudent = function () {
        console.log('rpara' + $routeParams.sid);

        if ($routeParams.sid == null) {
            studentregFactory.saveStudent($scope.stud).success(function (data) {
                if (data.d == true) {
                    $rootScope.showMessage = true;
                    $rootScope.message = "Student data saved successfully";
                }
                else {
                    $rootScope.showMessage = true;
                    $rootScope.message = "Student data not saved,Please contact admin";
                }
                $scope.success = true;
                //localStorage.setItem('studentsinls', $scope.studentinDb);
                window.location = "http://localhost:32566/Views/StudentRegistration.aspx#/List";
            });
        }

        else {

            studentregFactory.editStudent($scope.stud).success(function (data) {
                if (data.d == true) {
                    console.log(data.d);
                    $rootScope.showMessage = true;
                    $rootScope.message = "Student updated Successfully";
                }
                else {
                    $rootScope.showMessage = true;
                    $rootScope.message = "Student data not saved,Please contact admin";
                }
                $scope.success = true;
                window.location = "http://localhost:32566/Views/StudentRegistration.aspx#/List";
            });
        }
    };

    $scope.saveStudentToLocal = function (stud) {
        debugger;
        var myLocalList = []; //load existing array at init        
        var key = 'myLocal';

        if (localStorage.getItem("myLocal") != null) {
            myLocalList = JSON.parse(localStorage.getItem("myLocal"));
        }
        myLocalList.push(stud);
        localStorage.setItem(key, JSON.stringify(myLocalList));
        //$scope.getCountFromLocal();
        window.location = "http://localhost:32566/Views/StudentRegistration.aspx#/List";

    };




    $scope.newStudent = function () {
        $scope.stud = {};
    };

    $scope.newData = function () {
        if ($routeParams.sid == null) {
            $scope.PageName = "Add Student";
            $scope.btnName = "Save";
            $scope.stud = {};
        }
        else {
            $scope.PageName = "Update Student";
            $scope.btnName = "Update";

            studentregFactory.findStudentByID($routeParams.sid).success(function (data) {
                //                debugger;
                var std = JSON.parse(data.d);
                $scope.stud = std[0];
                $scope.stud.bday = new Date(std[0].bday);
            });
        }
        $rootScope.showMessage = false;
    };
    $scope.newData();


});


//---------------------------------------------end add controller--------------------------------------------

//---------------------------------------------list HTML--------------------------------------------


<div>

    <div ng-show="showMessage" class="alert alert-success">{{message}}</div>
        <div style="align: right">
        </div>
   
       <div class="form-group" style="align: right">     
        <button type="submit" class="btn btn-success" ng-click="saveStudentFromLocalToCloud()">
            Sync To Cloud
        </button>
    </div>

    <div class="page-header">
    <h1>List of Student from Local Storage </h1>
    
    </div>
    <div>
        <table class="table table-bordered table-hover" ng-show="studentinDb.length > 0">
            <thead>
                <tr>
                    <th ng-click="orderByMe('fname')" style="cursor:pointer">
                        <b>First Name</b>
                    </th> 
                    <th ng-click="orderByMe('lname')" style="cursor:pointer">
                        <b>Last Name</b>
                    </th>
                    <th>
                        <b>Birth date</b>
                    </th>
                    <th>
                        <b>Gender</b>
                     </th>
                    <th>
                        <b>Address</b>
                    </th>
                    <td>
                        <b>hobbies</b>
                    </td>
                    
                   
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="stud in StudentListLocal | filter : test| orderBy:myOrderBy:sortOrder  ">
                    <td>
                        {{stud.fname}}
                    </td>
                    <td>
                        {{stud.lname}}
                    </td>
                    <td>
                         {{stud.bday| date : 'dd/MM/yyyy'}}
                    </td>
                     <td>
                        {{stud.gender}}
                    </td>
                    <td>
                        {{stud.address.firstline}} {{stud.address.district.District_Name}} {{stud.address.state.State_Desc}}
                        {{stud.address.country.Country_Description}}
                    </td>
                     <td>
<!--                     <label ng-repeat="hob in stud.hobbies ">
                     
                     {{hob.name}}  <br />
                     </label>-->
                     <table >
                        <tr ng-repeat="hob in stud.hobbies ">
                            <td >
                            {{hob.name}}
                            </td>
                        </tr>
                     
                     </table>
                     
                        
                    </td>
                   
                    
                </tr>
            </tbody>
        </table>
    
    </div>




    <div class="page-header">
        <h1>
            List of Students from Cloud storage</h1>
    </div>
    <div class="form-group">
        
        <div>
        <p><b>Filter : </b><input type="text" ng-model="test"></p>
        </div>

        <table class="table table-bordered table-hover" ng-show="studentinDb.length > 0">
            <thead>
                <tr>
                    <th ng-click="orderByMe('fname')" style="cursor:pointer">
                        <b>First Name</b>
                    </th> 
                    <th ng-click="orderByMe('lname')" style="cursor:pointer">
                        <b>Last Name</b>
                    </th>
                    <th>
                        <b>Birth date</b>
                    </th>
                    <th>
                        <b>Gender</b>
                     </th>
                    <th>
                        <b>Address</b>
                    </th>
                    <td>
                        <b>hobbies</b>
                    </td>
                    <th>
                        <b>Edit</b>
                    </th>
                    <th >
                        <b>Delete</b>
                    </th>
                   
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="stud in studentinDb | filter : test| orderBy:myOrderBy:sortOrder  "> <!--//| limitTo : 5 -->
                    <td>
                        {{stud.fname}}
                    </td>
                    <td>
                        {{stud.lname}}
                    </td>
                    <td>
                         {{stud.bday| date : 'dd/MM/yyyy'}}
                    </td>
                     <td>
                        {{stud.gender}}
                    </td>
                    <td>
                        {{stud.address.firstline}} {{stud.address.district.District_Name}} {{stud.address.state.State_Desc}}
                        {{stud.address.country.Country_Description}}
                    </td>
                     <td>
<!--                     <label ng-repeat="hob in stud.hobbies ">
                     
                     {{hob.name}}  <br />
                     </label>-->
                     <table >
                        <tr ng-repeat="hob in stud.hobbies ">
                            <td >
                            {{hob.name}}
                            </td>
                        </tr>
                     
                     </table>
                     
                        
                    </td>
                    <td >                    
                        <a href="#Add/{{stud._id.$oid}}" >
                        Edit
                        </a>
                    </td>

                    <td style="cursor:pointer" >                    
                        <a ng-click="fnDelete(stud._id.$oid)" >
                        Delete
                        </a>
                    </td>
                    
                </tr>
            </tbody>
        </table>
    </div>
</div>


------------------------------------------------------- end list HTML -----------------------------------


------------------------------------------------------- list controller-----------------------------------
app.controller('listCtrl', function ($scope, studentregFactory, $rootScope) {

    //Find All Student Details
    $scope.getStudentData = function () {
        studentregFactory.getAllStudnets().success(function (data) {
            $scope.studentinDb = JSON.parse(data.d);
            //$scope.sortOrder = false;
            $scope.success = true;
        })
    };

    $scope.fnDelete = function (id) {
        studentregFactory.deleteStudent(id).success(function (data) {

            if (data.d == true) {
                $scope.showMessage = true;
                $scope.message = "Student data Deleted Successfully";
                $scope.getStudentData();
            }
            else {
                $scope.showMessage = true;
                $scope.message = "Student data not deleted Successfully";
            }
        })
    };

    $scope.sortOrder = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = x;
        $scope.sortOrder = !$scope.sortOrder;
    };


    $scope.getStudentDataLocalStorage = function () {
        if (localStorage.getItem("myLocal") != null) {
            $scope.StudentListLocal = JSON.parse(localStorage.getItem("myLocal"));
        }

    };

    $scope.saveStudentFromLocalToCloud = function () {
        
        studentregFactory.saveStudentToCloud(JSON.parse(localStorage.getItem("myLocal"))).success(function (data) {
                if (data.d == true) {
                    localStorage.removeItem("myLocal");
                    $rootScope.showMessage = true;
                    $rootScope.message = "Student data saved successfully to cloud";
                }
                else {
                    $rootScope.showMessage = true;
                    $rootScope.message = "Student data not saved,Please contact admin";
                }
                $scope.success = true;
    });
    
    
    };

    $scope.getStudentDataLocalStorage();
    $scope.getStudentData();

});


//--------------------------------------------- END list controller ----------------------------------------------


//-------------------------------------------factory ------------------------------------------------------------

app.factory('studentregFactory', function ($http) {

    var service = {}

    service.saveStudent = function (stud) {

        return $http({
            url: "StudentRegistration.aspx/saveStudent",
            method: "POST",
            data: { StudentObj: angular.toJson(stud) }
        })
    };


    service.getAllStudnets = function () {
        return $http({
            url: "StudentRegistration.aspx/getAllStudent",
            method: "GET",
            data: {},
            headers: { "Content-Type": "application/json" }
        })
    };

    service.deleteStudent = function (id) {
        return $http({
            url: "StudentRegistration.aspx/delete",
            method: "POST",
            data: { sid: id }
        })
    };

    service.editStudent = function (student) {
        console.log('testfac'+student);
        return $http({
            url: "StudentRegistration.aspx/editStudent",
            method: "POST",
            data: { StudentObj: angular.toJson(student) }
        })
    };

    service.findStudentByID = function (sid) {
        return $http({
            url: "StudentRegistration.aspx/findStudentByID",
            method: "POST",
            data: { sid: sid }
        })
    };


    service.saveStudentToCloud = function (stud) {
        debugger;
        return $http({
            url: "StudentRegistration.aspx/saveStudentToCloud",
            method: "POST",
            data: { StudentObj: angular.toJson(stud) }
        })
    };



    return service;

});

//-------------------------------------------end factory---------------------------------------------------------


//----------------------------------------------DAL--------------------------------------------------------------

public bool SaveDocumentBsonArray(string objectToSave, string collectionName)
        {
            var collection = mongoDB.GetCollection<BsonArray>(collectionName);
            //collection.RemoveAll();
            var netxMessageBatch = BsonSerializer.Deserialize<BsonArray>(objectToSave);
            collection.InsertBatch(netxMessageBatch);
            return true;
            //var collection1 = mongoDB.GetCollection<BsonDocument>(collectionName);
            //MongoCursor<BsonDocument> cursor = collection1.FindAll();
            //List<BsonDocument> entities = cursor.ToList();
            //JavaScriptSerializer Json = new JavaScriptSerializer();
            //string returnDocs = Json.Serialize(entities);

        }



        #region Model Based Operations
        /// <summary>
        /// Save The Document, override the ToString() method in the model to provide the collection name
        /// </summary>
        /// <param name="objectToSave"></param>
        /// <returns></returns>
        public bool SaveCollection(object objectToSave)
        {
            string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objectToSave);
            BsonDocument document = BsonDocument.Parse(jsonString);

            var collection = mongoDB.GetCollection(objectToSave.ToString());

            collection.Insert(objectToSave);
            return true;
        }

        public bool SaveCollection(object objectToSave, string collectionName)
        {
            string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objectToSave);
            BsonDocument document = BsonDocument.Parse(jsonString);

            var collection = mongoDB.GetCollection(collectionName);

            collection.Insert(objectToSave);
            return true;
        }

        public MongoCollection<T> GetAllDocuments<T>(string collectionName)
        {
            return mongoDB.GetCollection<T>(collectionName);
        }
        #endregion
//---------------------------------------------- End DAL---------------------------------------------------------