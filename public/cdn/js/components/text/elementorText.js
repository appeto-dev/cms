angular.module('cmsApp').component('elementorText', {
    templateUrl: url + 'api/panel/load-elementor/text',
    bindings: {
        key: '@',
        index: '@',
        title: '@',
        setting: '@',
    },
    controller: function($scope, $http, $location, $timeout) {
        $scope.closeAndSave = LANG['closeAndSave'];
        $scope.getDesignFrom = LANG['getDesignFrom'];
        $scope.init = function () {
            let settings = JSON.parse(Base64.decode($scope.$ctrl.setting));
            let content = settings['content'] || "";
            $timeout(function () {
                $("#elementor_text_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index).on("show.bs.modal", function(e) {
                    $("#elementor_ck_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index).html(content);
                    $("#elementor-section-"+$scope.$ctrl.key+'-'+$scope.$ctrl.index+' .elementor-content-editor').each(function () {
                        delete window[$(this).attr('id')];
                        window[$(this).attr('id')] = CKEDITOR.replace($(this).attr('id'), ckEditorOptions);
                    });
                });
            }, 150);
            /*$timeout(function (){
                $("#elementor_ck_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index).html(content);
                $("#elementor-section-"+$scope.$ctrl.key+'-'+$scope.$ctrl.index+' .elementor-content-editor').each(function () {
                    delete window[$(this).attr('id')];
                    window[$(this).attr('id')] = CKEDITOR.replace($(this).attr('id'), ckEditorOptions);
                });
            }, 1000);*/
        };
        $scope.save = function (key, index) {
            var _editor = window['elementor_ck_' + key + '_' + index];
            _editor.updateElement();
            EditorCtrl.elementorSaveElementSetting(key, index, 'text', {
                "content": _editor.getData()
            });
        }
    },
});