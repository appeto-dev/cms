angular.module('cmsApp').component('elementorImage', {
    templateUrl: url + 'api/panel/load-elementor/image',
    bindings: {
        key: '@',
        index: '@',
        title: '@',
        setting: '@',
    },
    controller: function($scope, $http, $location, $timeout) {
        $scope.closeAndSave = LANG['closeAndSave'];
        $scope.src = '';
        $scope.width = 128;
        $scope.height = 128;
        $scope.init = function () {
            let settings = JSON.parse(Base64.decode($scope.$ctrl.setting));
            $scope.src = settings['src'] || '';
            $scope.width = settings['width'] || 0;
            $scope.height = settings['height'] || 0;
            $timeout(function () {
                $("#elementor_select_image_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index).val($scope.src);
            }, 500);
        };
        $scope.showElmBtnRouter = function () {
            let settings = JSON.parse(Base64.decode($scope.$ctrl.setting));
            let text = settings['text'] || "";
            let data = settings['data'] || {"type": "none", "link":"", "router":""};
            $("#button_router_text").val(text);
            $("#button_router_type_0").val(data['type']);
            $("#button_router_link_0").val(data['link']);
            $("#button_router_router_0").val(data['router']);
            $("#button_router_router_0").html(data['router']);
            button_router_show_settings();
            $("#buttonRouter").modal('show');
        }
        $scope.save = function (key, index) {
            let src = $("#elementor_select_image_"+key+"_"+index).val();
            $scope.src = src;
            EditorCtrl.elementorSaveElementSetting(key, index, 'image', {
                "src": src,
                "width": $scope.width,
                "height": $scope.height,
                'text': $("#button_router_text").val(),
                'data': {
                    'type': $("#button_router_type_0").val(),
                    'link': $("#button_router_link_0").val(),
                    'router': $("#button_router_router_0").html()
                }
            });
        }
    },
});