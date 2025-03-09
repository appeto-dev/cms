angular.module('cmsApp').component('elementorModule', {
    templateUrl: url + 'api/panel/load-elementor/module',
    bindings: {
        app: '@',
        element: '@',
        key: '@',
        index: '@',
        title: '@',
        setting: '@',
    },
    controller: function($scope, $http, $location, $timeout) {
        $scope.closeAndSave = LANG['closeAndSave'];
        $scope.loading = false;
        $scope.element = '';
        $scope.moduleId = '';
        $scope.enableType = false;
        $scope.type = '';
        $scope.info = [];
        $scope.design_type = {};
        $scope.init = function () {
            let settings = JSON.parse(Base64.decode($scope.$ctrl.setting));
            $scope.element = $scope.$ctrl.element;
            $scope.moduleId = settings['id'] || '';
            $scope.type = settings['type'] || '';
            $scope.design_type[$scope.element] = settings['design_type'] || 'default';
            $timeout(function () {
                $("#elementor_module_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index).on("show.bs.modal", function(e) {
                    $scope.getElementData();
                });
            }, 150);
        };
        $scope.save = function (key, index) {
            if($scope.element != '' && $scope.moduleId != '') {
                console.log($scope.design_type[$scope.element]);
                EditorCtrl.elementorSaveElementSetting(key, index, $scope.element, {
                    'id': $scope.moduleId,
                    'type': $scope.type,
                    'design_type': $scope.design_type[$scope.element],
                });
            }
        }
        $scope.getElementData = function () {
            var data = $.param({});
            $scope.loading = true;
            blockUi();
            $http({
                method : "GET",
                url : url + 'api/panel/load-elementor/loadModuleData?element='+$scope.element+'&sl='+$scope.$ctrl.app,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: data
            }).then(function success(response) {
                $scope.loading = false;
                unBlockUi();
                if(response.data.status) {
                    $scope.info = response.data.data;
                    $scope.enableType = response.data.enableType;
                }
                else {
                    showMsg(LANG["global_error"], LANG["wrong_title"], "error");
                }
            }, function error(response) {
                $scope.loading = false;
                showMsg(LANG["global_error"], LANG["wrong_title"], "error");
                unBlockUi();
            });
        }
    },
});