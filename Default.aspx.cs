using conexionAfexmysql;
using EntiedadAfex;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;




namespace Afex_BryanEncalada
{
    public partial class _Default : Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
       
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static Boolean InsertarEnalce(string codigo, string titulo, string imagen, string descripcion) {

            try {
                ConeccionDA da = new ConeccionDA();

                var resp = da.ListarEnlace(codigo);
                if (resp.Count() == 0)
                {

                    videos video = new videos();
                    video.id = 0;
                    video.codigo = codigo;
                    video.titulo = titulo;
                    video.imagen = imagen;
                    video.descripcion = descripcion;

                    return da.mantVideos("INS",video);

                }

                 return false;

            }
            catch {

                return false;
            }

            
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static Boolean EliminarEnlace(string codigo)
        {

            try
            {
                ConeccionDA da = new ConeccionDA();
                videos video = new videos();
                video.codigo = codigo.Substring(0,codigo.Length-1);
                video.id = 0;
                video.titulo = "";
                video.imagen = "";
                video.descripcion = "";

                return  da.mantVideos("ELI", video);
                  

            }
            catch
            {

                return false;
            }


        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<videos> listaEnlace() {

            ConeccionDA da = new ConeccionDA();
            List<videos> listaEnlace = da.ListarEnlace("");

            return listaEnlace.ToList();


        }
    }
}