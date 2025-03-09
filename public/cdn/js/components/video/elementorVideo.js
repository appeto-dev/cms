angular.module('cmsApp').component('elementorVideo', {
    templateUrl: url + 'api/panel/load-elementor/video',
    bindings: {
        key: '@',
        index: '@',
        title: '@',
        setting: '@',
    },
    controller: function($scope, $http, $location, $timeout) {
        $scope.closeAndSave = LANG['closeAndSave'];
        $scope.src = '';
        $scope.video = '';
        $scope.init = function () {
            let settings = JSON.parse(Base64.decode($scope.$ctrl.setting));
            $scope.src = settings['src'] || '';
            $scope.video = settings['video'] || '';
        };
        $scope.save = function (key, index) {
            let src = $("#mp4_image_"+key+"_"+index).val();
            let video = $("#mp4_link_"+key+"_"+index).val();
            $scope.src = src;
            $scope.video = video;
            if( $.trim($scope.video) )
            {
                if( getExtension($scope.video) !== 'mp4' && getExtension($scope.video) !== 'mkv' )
                {
                    my_alert(LANG['extension_mp4']);
                    return false;
                }
            }
            EditorCtrl.elementorSaveElementSetting(key, index, 'video', {
                "src": src,
                "video": video
            });
        }
    },
});