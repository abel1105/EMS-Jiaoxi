var page_url = document.location.href;

// 網址 regex
var ems_case_add = /EMCase\/EMCaseAdd\.jsp/g;   // 報案紀錄新增
var ems_aid_case_update = /AidCase\/AidCaseMTUpd\.jsp/g;  // 救護紀錄修改


// 判斷是否為 報案紀錄新增 頁面
if(ems_case_add.test(page_url)){	
	console.log("自動填入 報案紀錄新增 預設值");
	// 申請人區分，設為他人
	$('select[name="caller_define"]').val(3);
	// 申請人姓名，設為 119
	$('input[name="case_caller"]').val("119");
	// 申請人電話，設為 119
	$('input[name="caller_phone"]').val("119");

	// 聯絡單位，設為交通隊
	$('input[name="coordinator_dept"]').val("交通隊");

	// 發生之行政區，設為礁溪鄉
	$('select[name="accident_area"]').val(3405);

	// 被救護人數，設為 1 人
	$('input[name="number"]').val(1);

}

// 判斷是否為 救護紀錄修改 頁面
if(ems_aid_case_update.test(page_url)){

	// 時間同一天
	$('input[name="B9"]').each(function(index){
		var $this = $(this);
		$this.click();
	});

	// 急救處置
	var add_source_btn = $('select[name="Source_Process"]').parent().next().find('input')[0]; // 急救處置新增按鈕
	// 填寫保暖
	$('select[name="Source_Process"]').val("E010");
	add_source_btn.click();	
	// 填寫心理支持
	$('select[name="Source_Process"]').val("E020");
	add_source_btn.click();

	// 生命徵象
	

}










