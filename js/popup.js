chrome.storage.sync.get('edraniaConfig', function(data){
	let edraniaConfig = data.edraniaConfig;
	if (edraniaConfig === undefined) {
		edraniaConfig = {};
	}

	function saveConfig()
	{
		const setting = this.name;

		if (this.type === 'checkbox') {
			let current = edraniaConfig[setting];
			if (current === undefined) {
				current = false;
			}

			edraniaConfig[setting] = current ? false : true;
		}
		else {
			edraniaConfig[setting] = this.value;
		}

		chrome.storage.sync.set({'edraniaConfig': edraniaConfig});
	}

	const elements = document.getElementsByClassName('js-set-config');

	for (let i = 0; i < elements.length; i++) {
		if (edraniaConfig[elements[i].name]) {
			if (elements[i].type === 'checkbox') {
				elements[i].checked = true;
			}
			else {
				elements[i].value = edraniaConfig[elements[i].name];
			}
		}

		elements[i].addEventListener('change', saveConfig);
	}
});
