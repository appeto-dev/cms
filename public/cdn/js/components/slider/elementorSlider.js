angular.module('cmsApp').component('elementorSlider', {
    templateUrl: url + 'api/panel/load-elementor/slider',
    bindings: {
        key: '@',
        index: '@',
        title: '@',
        setting: '@',
    },
    controller: function($scope, $http, $location, $timeout) {
        $scope.closeAndSave = LANG['closeAndSave'];
        $scope.move = 'automatic';
        $scope.interval = 4;
        $scope.indicator = "1";
        $scope.height = 260;
        $scope.slides = [];
        $scope.list = null;
        $scope.init = function () {
            let settings = JSON.parse(Base64.decode($scope.$ctrl.setting));
            $scope.slides = settings['slides'] || [];
            $scope.move = settings['move'] || 'automatic';
            $scope.indicator = settings['indicator'] || '1';
            $scope.height = Number(settings['height'] || 260);
            $scope.interval = Number(settings['interval'] || 4);
            $timeout(function () {
                $scope.list = listSortManager('contact_slider_'+$scope.$ctrl.key+'_'+$scope.$ctrl.index+'_sortable', function () {

                });
            }, 300);
        };
        $scope.save = function (key, index) {
            $scope.elementorSlideSetImages();
            $timeout(function () {
                console.log($scope.move,
                    $scope.interval,
                    $scope.indicator,
                    $scope.height,
                    $scope.slides
                );
                EditorCtrl.elementorSaveElementSetting(key, index, 'slider', {
                    'move': $scope.move,
                    'interval': $scope.interval,
                    'indicator': $scope.indicator,
                    'height': $scope.height,
                    'slides': $scope.slides,
                });
            }, 300);
        };
        $scope.elementorRemoveRepeater = function (box, obj, callback, index) {
            var remove = true;
            if(callback != '' && typeof window[callback] == "function") {
                remove = window[callback](index, obj);
            }
            if(remove) {
                $scope.elementorSlideSetImages();
                $timeout(function () {
                    $scope.slides.splice(index, 1);
                    var newOrder = EditorCtrl.copyObject($scope.slides);
                    for(var j in newOrder) {
                        for(var k in newOrder[j]) {
                            if(k == "router") {
                                $("#slider_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index+"_"+k+"_"+j).html(newOrder[j][k]);
                            }
                            else if(k == "image") {
                                $("#slider_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index+"_"+k+"_"+j).val(newOrder[j][k]);
                                $("#slider_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index+"_"+k+"_"+j+"_src").attr('src', url + newOrder[j][k]);
                            }
                            else if(k == "type") {
                                $scope.elementorShowRepeaterTypeRouter(box, newOrder[j][k], j);
                            }
                            else {
                                $("#slider_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index+"_"+k+"_"+j).val(newOrder[j][k]);
                            }
                        }
                    }
                }, 0);
            }
        };
        $scope.elementorAddRepeater = function (box, callback, defaultVal) {
            defaultVal = JSON.parse(Base64.decode(defaultVal));
            $scope.slides.push(defaultVal);
            $scope.elementorShowRepeaterTypeRouter(box, 'none', $scope.slides.length - 1);
            $scope.elementorSlideSetImages();
            if(callback != '' && typeof window[callback] == "function") {
                window[callback]();
            }
        };
        $scope.elementorSlideSetImages = function () {
            for(let i in $scope.slides) {
                let image = $("#slider_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index+"_image_"+i).val();
                if(image == '' || image === undefined || image == 'undefined') {
                    image = '/uploads/stocks/images/abb.jpg';
                }
                let type = $("#slider_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index+"_type_"+i).val();
                let router = $("#slider_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index+"_router_"+i).html();
                $scope.slides[i].image = image;
                $scope.slides[i].type = type;
                $scope.slides[i].router = router;
            }
        }
        $scope.ElementorApplyShowRouterSettings = function (id, type, index) {
            type = $("#slider_"+$scope.$ctrl.key+"_"+$scope.$ctrl.index+"_type_"+index).val();
            EditorCtrl.applyShowRouterSettings(id, type, index);
        };
        $scope.elementorShowRepeaterTypeRouter = function (box, type, index) {
            if(type == '' || type === undefined || type == 'undefined' || type == null) {
                type = 'none';
            }
            $timeout(function () {
                if(type == 'none' || type == "link" || type == "email" || type == "tel" || type == "ussd") {
                    $("#"+box+"_link_"+index).show();
                    $("#"+box+"_router_settings_"+index).hide();
                }
                else {
                    $("#"+box+"_link_"+index).hide();
                    $("#"+box+"_router_settings_"+index).show();
                }
            }, 150);
        }
    },
});