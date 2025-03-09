angular.module('cmsApp').component('elementorAudio', {
    templateUrl: url + 'api/panel/load-elementor/audio',
    bindings: {
        key: '@',
        index: '@',
        title: '@',
        setting: '@',
    },
    controller: function($scope, $http, $location, $timeout) {
        $scope.closeAndSave = LANG['closeAndSave'];
        $scope.src = '';
        $scope.file = '';
        $scope.init = function () {
            let settings = JSON.parse(Base64.decode($scope.$ctrl.setting));
            $scope.src = settings['src'] || '';
            $scope.file = settings['file'] || '';
        };
        $scope.save = function (key, index) {
            let src = $("#mp4_image_"+key+"_"+index).val();
            let file = $("#mp4_link_"+key+"_"+index).val();
            $scope.src = src;
            $scope.file = file;
            if( $.trim($scope.file) )
            {
                if( getExtension($scope.file) !== 'mp3' )
                {
                    my_alert(LANG['extension_mp3']);
                    return false;
                }
            }
            EditorCtrl.elementorSaveElementSetting(key, index, 'audio', {
                "src": src,
                "file": file
            });
        }
    },
});