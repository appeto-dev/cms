angular.module('cmsApp').component('elementorSpace', {
    template: `
    <!-- text modal -->
    <div class="modal fade" id="elementor_space_{{$ctrl.key}}_{{$ctrl.index}}" tabindex="-1" role="dialog" aria-labelledby="elementor_space_{{$ctrl.key}}_{{$ctrl.index}}" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{$ctrl.title}}</h5>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="label text-right">{{sizeLabel}}</label>
                        <input type="number" class="form-control" ng-model="height">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-round ml-2 mr-2" data-dismiss="modal" aria-label="Close">{{cancel}}</button>
                    <button type="button" ng-click="save($ctrl.key, $ctrl.index)" class="btn btn-purple btn-round" data-dismiss="modal" aria-label="Close">{{closeAndSave}}</button>
                </div>
                <span ng-init="init()"></span>
            </div>
        </div>
    </div>
    <!-- text modal -->
    `,
    bindings: {
        key: '@',
        index: '@',
        title: '@',
        setting: '@',
    },
    controller: function($scope, $http, $location, $timeout) {
        $scope.cancel = LANG['cancel'];
        $scope.closeAndSave = LANG['closeAndSave'];
        $scope.sizeLabel = LANG['size'];
        $scope.colorLabel = LANG['color'];
        $scope.height = 8;
        $scope.init = function () {
            let settings = JSON.parse(Base64.decode($scope.$ctrl.setting));
            $scope.height = Number(settings['height'] || 8);
        };
        $scope.save = function (key, index) {
            EditorCtrl.elementorSaveElementSetting(key, index, 'space', {
                "height": $scope.height
            });
        }
    },
});