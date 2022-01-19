<?php
	$dynamic_app = getenv('DYNAMIC_APP');
	$static_app = getenv('STATIC_APP');
?>
<VirtualHost *:80>
	ServerName api.demo.ch
	
	# On part du plus spécifique au moins spécifique
	ProxyPass '/api/students/' 'http://<?php print "$dynamic_app"?>/'
	ProxyPassReverse '/api/students/' 'http://<?php print "$dynamic_app"?>/'
	
	ProxyPass '/' 'http://<?php print "$static_app"?>/'
	ProxyPassReverse '/' 'http://<?php print "$static_app"?>/'
</VirtualHost>
