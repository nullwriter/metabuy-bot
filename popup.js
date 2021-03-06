$(document).ready(function(){

	localStorage["radioOption"] = "automatic"; // default option when starting the extension
	loadSettings();

	checkVersion();

	$("button#go").on("click", function(){
		
		var option =  $("input[name='typeSearch']:checked").val().trim();

			if(option === "direct")
			{
				var link = $("#directLink").val();
				saveSettings();
				window.open(link,"_blank");
			}
			else
			{
				saveSettings();
			}

		window.close();
	});

	$("button#startScan").on("click",function(){
		saveSettings();
		if(fieldsAreFilled())
			chrome.runtime.sendMessage({status:"automatic-scan"});
	});

	$("button#stopScan").on("click",function(){
		saveSettings();
		chrome.runtime.sendMessage({status:"stop-scan"});
	});


	$("input[name='typeSearch']").on("change", function(){

		var curr = $(this).val().trim(); // automatic or direct
		
		if(curr === "direct")
			$("button#go").text("Go Now!");
		else
			$("button#go").text("Save Settings");

	});

	$("a#log").on("click", function(){
		chrome.tabs.create({ url: chrome.extension.getURL("log.html") });
	});

	$("a#help").on("click", function(){
		chrome.tabs.create({ url: chrome.extension.getURL("howtouse.html") });
	});

	function checkVersion()
	{
		if(localStorage['latestVersion'] != undefined)
		{
			var curr = chrome.app.getDetails().version;
			
			if( curr != localStorage['latestVersion'])
			{
				$("#bot-msg").text("New bot version available! -> " + localStorage['latestVersion']);
			}
			else
				$("#bot-msg").text("Bot is up to date");
		}
	}

	function checkValidation()
	{
		if(localStorage["validBot"] === 1)
		{
			localStorage["radioOption"] = "automatic"; // default option when starting the extension
			loadSettings();
		}
		else
		{

		}
	}

	function fieldsAreFilled()
	{
		var flag = false;

		if($("input#shoeSize").val() === "")
		{
			alert("You need to add a shoe size.");
		}
		else if($("input#shoeName").val() === "")
		{
			alert("You need to add keywords. Only add the keywords you KNOW will appear on the tweet.");
		}
		else if($("input#twitter").val() === "")
		{
			alert("You need to add a twitter username to scan to.");
		}
		else
			flag = true;

		return flag;
	}


	function loadSettings()
	{
		if(localStorage["shoesize"] !== undefined)
		{
			$("input#shoeSize").val(localStorage["shoesize"]);
		}

		if(localStorage["keywords"] !== undefined)
		{
			$("input#shoeName").val(localStorage["keywords"]);
		}

		if(localStorage["twitter"] !== undefined)
		{
			$("input#twitter").val(localStorage["twitter"]);
		}

		if(localStorage["radioOption"] !== undefined)
		{
			if(localStorage["radioOption"] === "automatic")
			{
				$("input#automatic").prop("checked",true);
				$("button#go").text("Save Settings");
			}
			else
			{
				$("input#direct").prop("checked",true);
				$("button#go").text("Go Now!");
			}
		}

		if(localStorage["link"] !== undefined)
		{
			$("#directLink").val(localStorage["link"]);
		}
	}

	function saveSettings()
	{
		localStorage["shoesize"] = $("input#shoeSize").val();
		localStorage["keywords"] = $("input#shoeName").val();
		localStorage["twitter"] = $("input#twitter").val();
		localStorage["radioOption"] = $("input[name='typeSearch']:checked").val().trim();
		localStorage["link"] = $("#directLink").val();
	}

});