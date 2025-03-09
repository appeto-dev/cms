angular.module('cmsApp').component('elementorIcon', {
    templateUrl: url + 'api/panel/load-elementor/icon',
    bindings: {
        key: '@',
        index: '@',
        title: '@',
        setting: '@',
    },
    controller: function($scope, $http, $location, $timeout) {
        $scope.closeAndSave = LANG['closeAndSave'];
        $scope.icon = 'fa-magic';
        $scope.icon_type = 'icon';
        $scope.title = '';
        $scope.design_type = 'default';
        $scope.init = function () {
            let settings = JSON.parse(Base64.decode($scope.$ctrl.setting));
            $scope.icon_type = settings['icon_type'] || "icon";
            $scope.icon = settings['icon'] || "fa-magic";
            $scope.cardTitle = settings['title'] || "";
            $scope.design_type = settings['design_type'] || "default";
            $timeout(function () {
                $('.icp-dd').iconpicker({
                    icons: ICON_PICKER_ICONS,
                    selectedCustomClass: 'bg-purple',
                    hideOnSelect: true
                });
                $('.icp-dd').on('iconpickerSelected', function(event){
                    $scope.$apply(function (){
                        $scope.icon = event.iconpickerValue;
                    });
                });
            }, 350);
            $timeout(function () {
                if($scope.icon_type == 'image') {
                    $("#elementor_select_icon_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index).val($scope.icon);
                }
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
            let src = $("#elementor_select_icon_"+key+"_"+index).val();
            if($scope.icon_type == 'image') {
                $scope.icon = src;
            }
            EditorCtrl.elementorSaveElementSetting(key, index, 'icon', {
                'icon_type': $scope.icon_type,
                'icon': $scope.icon,
                'title': $scope.cardTitle,
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