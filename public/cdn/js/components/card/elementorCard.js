angular.module('cmsApp').component('elementorCard', {
    templateUrl: url + 'api/panel/load-elementor/card',
    bindings: {
        key: '@',
        index: '@',
        title: '@',
        setting: '@',
    },
    controller: function($scope, $http, $location, $timeout) {
        $scope.closeAndSave = LANG['closeAndSave'];
        $scope.src = '';
        $scope.title = '';
        $scope.subtitle = '';
        $scope.content = '';
        $scope.design_type = 'default';
        $scope.init = function () {
            let settings = JSON.parse(Base64.decode($scope.$ctrl.setting));
            $scope.src = settings['src'] || '';
            $scope.title = settings['title'] || '';
            $scope.subtitle = settings['subtitle'] || '';
            $scope.content = settings['content'] || '';
            $scope.design_type = settings['design_type'] || 'default';
            $timeout(function () {
                $("#elementor_select_image_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index).val($scope.src);
            }, 500);
        };
        $scope.showElmCardRouter = function () {
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
            EditorCtrl.elementorSaveElementSetting(key, index, 'text', {
                'src': $scope.src,
                'title': $scope.title,
                'subtitle': $scope.subtitle,
                'content': $scope.content,
                'design_type': $scope.design_type,
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