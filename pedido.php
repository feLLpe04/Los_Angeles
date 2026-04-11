
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://fonts.cdnfonts.com/css/castello-typeface" rel="stylesheet">
	<link rel="stylesheet" href="./styles/stylesheet1.css">
	<title>Los Ángeles — Total</title>
</head>
<body>
	<div class="container-precoPedido">
		<p class="precoPedido">
			<?php
				$refriQuantidade=$_GET["a"];
				$sucoQuantidade=$_GET["b"];
				$cervejaQuantidade=$_GET["c"];
				$XSaladaQuantidade=$_GET["d"];
				$XBurgerQuantidade=$_GET["e"];
				$XBaconQuantidade=$_GET["f"];

				$refriValor=4000;
				$sucoValor=22000;
				$cervejaValor=30000;
				$XSaladaValor=36000;
				$XBurgerValor=44000;
				$XBaconValor=39000;

				$refri=$refriValor * $refriQuantidade;
				$suco=$sucoValor * $sucoQuantidade;
				$cerveja=$cervejaValor * $cervejaQuantidade;
				$XSalada=$XSaladaValor*$XSaladaQuantidade;
				$XBurger= $XBurgerValor*$XBurgerQuantidade;
				$XBacon=$XBaconValor*$XBaconQuantidade;

				$total = $refri + $suco + $cerveja + $XSalada + $XBurger + $XBacon;

				echo "$total";
			?>
		</p>
	</div>
</body>
</html>
