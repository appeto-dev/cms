angular.module('cmsApp').component('elementorButton', {
    templateUrl: url + 'api/panel/load-elementor/button',
    bindings: {
        key: '@',
        index: '@',
        title: '@',
        setting: '@',
    },
    controller: function($scope, $http, $location, $timeout) {
        $scope.closeAndSave = LANG['closeAndSave'];
        $scope.save = function (key, index) {
            EditorCtrl.elementorSaveElementSetting(key, index, 'button', {
                'text': $("#button_router_text").val(),
                'data': {
                    'type': $("#button_router_type_0").val(),
                    'link': $("#button_router_link_0").val(),
                    'router': $("#button_router_router_0").html()
                }
            });
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
    },
});