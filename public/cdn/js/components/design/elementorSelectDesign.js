angular.module('cmsApp').component('elementorSelectDesign', {
    templateUrl: url + 'api/panel/load-elementor/design',
    bindings: {
        element: '@',
        key: '@',
        index: '@',
        title: '@',
        design: '@',
    },
    controller: function($scope, $http, $location, $timeout) {
        $scope.closeAndSave = LANG['closeAndSave'];
        $scope.getDesignFrom = LANG['getDesignFrom'];
        $scope.elementorDesignSelector = LANG['elementorDesignSelector'];
        $scope.designSection = "";
        $scope.init = function () {
            $scope.designSection = $scope.$ctrl.design || "";
        };
        $scope.save = function (key, index) {
            EditorCtrl.elementorSaveElementDesign(key, index, $scope.$ctrl.element, $scope.designSection);
        }
        $scope.checkDisable = function (section) {
            switch ($scope.$ctrl.element) {
                case "text":
                case "image":
                case "card":
                case "video":
                case "audio":
                case "map":
                case "blog":
                case "shop":
                case "video_shop":
                case "file_shop":
                case "divar":
                case "menu":
                case "icon":
                    if(section == 'panels' || section == 'cards' || section == 'no_panels' || section == 'lists') {
                        return false;
                    }
                break;
                case "button":
                    if(section == 'buttons' || section == 'fab_buttons') {
                        return false;
                    }
                break;
                case "search":
                    if(section == 'inputs') {
                        return false;
                    }
                break;
                case "slider":
                    if(section == 'slideshow') {
                        return false;
                    }
                break;
                default:
                    return true;
            }
            return true;
        }
    },
});