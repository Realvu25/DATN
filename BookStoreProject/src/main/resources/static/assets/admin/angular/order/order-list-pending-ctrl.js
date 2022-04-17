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

angular.module("order-pending-app", ["order-pending-app.controllers", "datatables"]);
angular
  .module("order-pending-app.controllers", [])
  .controller(
    "order-pending-ctrl",
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
        $http.get("/rest/order/pending").then((resp) => {
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
          console.log($scope.formDetail);
        });
        $("#modalDetail").modal("show");
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

      $scope.formApprove = {};
      $scope.showModalApprove = function (item) {
        $scope.formApprove = item;
        $("#modalApprove").modal("show");
      };

      $scope.approve = function () {
        $http
          .put(`/rest/order/approve/` + $scope.formApprove.id)
          .then((resp) => {
            var index = $scope.items.findIndex(
              (p) => p.id == $scope.formApprove.id
            );
            $scope.items.splice(index, 1);
            $scope.info.status = true;
            $scope.info.alert = "Thành Công!";
            $scope.info.content = "Bạn đã duyệt thành công đơn hàng này!";
            $("#modalInfo").modal("show");
          })
          .catch((error) => {
            console.log(error);
          });
      };

      $scope.formCancel = {};
      $scope.showModal = function (item) {
        $scope.formCancel = item;
        $("#modal").modal("show");
      };

      $scope.cancel = function () {
        $http
          .put(`/rest/order/cancel/` + $scope.formCancel.id)
          .then((resp) => {
            var index = $scope.items.findIndex(
              (p) => p.id == $scope.formCancel.id
            );
            $scope.items.splice(index, 1);

            $scope.info.status = true;
            $scope.info.alert = "Thành Công!";
            $scope.info.content = "Bạn đã hủy đơn hàng thành công!";
            $("#modalInfo").modal("show");

          })
          .catch((error) => {          
          });
      };

      $scope.vm = {};
      $scope.vm.dtInstance = {};
      $scope.vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(7).notSortable(),
      ];
      $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption("paging", true)
        .withOption("searching", true)
        .withOption("info", true);
    }
  );
