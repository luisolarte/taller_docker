using Microsoft.AspNetCore.Mvc;

namespace WsValidacion.Controllers
{
	[Route("[controller]")]
	public class ValidacionController : Controller
    {
		[HttpGet("{nroReferencia}")]
		public string Get(string idReferencia)
		{
			var tipo = idReferencia.Substring(1, 1).ToUpper();
			var clasificacion = string.Empty;

			switch(tipo)
			{
				case "L":
					clasificacion = "luz";
					break;
				case "G":
					clasificacion = "gas";
					break;
				case "T":
					clasificacion = "telefono";
					break;
				case "A":
					clasificacion = "agua";
					break;
				case "C":
					clasificacion = "celular";
					break;
				default:
					clasificacion = "error";
					break;
			}

			return clasificacion;
		}
	}
}
