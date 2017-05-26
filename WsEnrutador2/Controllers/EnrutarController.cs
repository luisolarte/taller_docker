using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using WsEnrutador.Clases;
using System.Text;

namespace WsEnrutador.Controllers
{
	[Route("[controller]")]
	public class EnrutarController : Controller
    {
		[HttpGet("{servicio}")]
		public string Get(string servicio)
		{
			var lista = LeerRutas();
			var direccion = string.Empty;

			if (lista.Where(l => l.Servicio.Equals(servicio)).Any())
			{
				direccion = lista.Where(l => l.Servicio.Equals(servicio)).Select(l => l.Url + "|" + l.Tipo.ToUpper()).FirstOrDefault();
			}
			else
			{
				direccion = "Servicio no encontrado";
			}

			return direccion;
		}

		[HttpPost]
		public bool Post([FromBody]Ruta objRuta)
		{
			var sb = new StringBuilder();
			sb.AppendLine(objRuta.Servicio + "|" + objRuta.Url);

			var byteArray = Encoding.UTF8.GetBytes("Persistencia/Rutas.txt");
			var stream = new MemoryStream(byteArray);

			using (StreamWriter sw = new StreamWriter(stream))
			{
				sw.WriteLine(sb);
			}

			return true;
		}

		private List<Ruta> LeerRutas()
		{
			var lista = new List<Ruta>();
			var fileStream = new FileStream("Persistencia/Rutas.txt", FileMode.Open);

			using (var reader = new StreamReader(fileStream))
			{
				var line = reader.ReadToEnd().Replace("\r\n", "^").Split('^').ToArray();
				foreach (var registro in line)
				{
					if (registro.Length == 0) continue;
					var reg = registro.Split('|');
					lista.Add(new Ruta { Servicio = reg[0], Url = reg[1], Tipo = reg[2] });
				}
			}

			return lista;
		}
	}
}
