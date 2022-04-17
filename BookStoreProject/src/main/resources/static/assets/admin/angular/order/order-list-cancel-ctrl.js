
function hideNote() {
	$("#validNote").hide();
	$("#note").hide();
	$("#saveNote").hide();
	$("#addNote").show();
}

function showNote() {
	$("#note").show();
	$("#saveNote").show();
	$("#addNote").hide();
}

hideNote();

function addNote() {
	showNote();
}

function saveNote() {
	angular.element("#modalDetail").scope().updateNote();
}

$('#modalDetail').on('hidden.bs.modal', function () {
    hideNote();
    $("#contentNote").removeClass("is-valid");
});
angular.module("order-cancel-app", ["order-cancel-app.controllers", "datatables"]);
angular
  .module("order-cancel-app.controllers", [])
  .controller(
    "order-cancel-ctrl",
    function (
      $scope,
      DTOptionsBuilder,
      DTColumnBuilder,
      DTColumnDefBuilder,
      $http
    ) {
      $scope.items = [];

      $scope.info = {};
      $scope.initialize = function () {
        $http.get("/rest/order/cancel").then((resp) => {
          $scope.items = resp.data;
        });
      };
      $scope.initialize();
      $scope.sendLink = function () {
		
		$("#phoneNumber").attr("href", "sip:" + $scope.formDetail.phone);
	  }
      $scope.formDetail = [];
      $scope.modalDetail = function (detail) {
        $http.get("/rest/order/pending/" + detail.id).then((resp) => {
          $scope.formDetail = resp.data;
        });
        $("#modalDetail").modal("show");
      };

      $scope.formDelete = {};
      $scope.showModal = function (item) {
        $scope.formDelete = item;
        $("#modal").modal("show");
      };

$scope.updateNote = function () {
      var item = angular.copy($scope.formDetail);
      	$http.post("/rest/order/note/update", item).then((resp) => {
      	  var index = $scope.items.findIndex((p) => p.id == item.id);
          $scope.items[index].note = item.note;
          $scope.formDetail = resp.data;
          $("#contentNote").addClass("is-valid");
          $("#validNote").show();
          $("#validNote").addClass("valid-feedback");
        }).catch((error) => {
          console.log(error);
          ("#contentNote").addClass("is-invalid");
          $("#validNote").show();
          $("#validNote").addClass("invalid-feedback");
        });
      }

      $scope.delete = function () {
        $http
          .delete(`/rest/order/delete/` + $scope.formDelete.id)
          .then((resp) => {
            var index = $scope.items.findIndex(
              (p) => p.id == $scope.formDelete.id
            );
            $scope.items.splice(index, 1);

            $scope.info.status = true;
            $scope.info.alert = "Thành Công!";
            $scope.info.content = "Bạn đã xóa vĩnh viễn đơn hàng thành công!";
            $("#modalInfo").modal("show");

          })
          .catch((error) => {          
          });
      };

      $scope.vm = {};
      $scope.vm.dtInstance = {};
      $scope.vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(6).notSortable(),
      ];
      $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption("paging", true)
        .withOption("searching", true)
        .withOption("info", true);
    }
  );
