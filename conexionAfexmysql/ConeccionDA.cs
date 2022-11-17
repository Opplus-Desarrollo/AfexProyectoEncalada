using EntiedadAfex;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace conexionAfexmysql
{
    public class ConeccionDA
    {

        MySqlConnector.MySqlConnection conn;
        MySqlConnector.MySqlCommand cmd;


        static string cadenaconexion()
        {

            MySqlConnector.MySqlConnectionStringBuilder builder = new MySqlConnector.MySqlConnectionStringBuilder();

            builder.Server = "localhost";
            builder.Database = "afex";
            builder.UserID = "root";
            builder.Password = "Bryan0303@";
            return builder.ToString();

        }


        public Boolean mantVideos(string tipo, videos video)
        {

            try
            {
                conn = new MySqlConnector.MySqlConnection(cadenaconexion());
                conn.Open();
                using (conn)
                {
                    using (cmd = new MySqlConnector.MySqlCommand("mantVideos", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@tipo", tipo);
                        cmd.Parameters.AddWithValue("@pcodigo", video.codigo);
                        cmd.Parameters.AddWithValue("@ptitulo", video.titulo);
                        cmd.Parameters.AddWithValue("@pimagen", video.imagen);

                        string sCada = video.descripcion;
                        if (!String.IsNullOrEmpty(sCada))
                            sCada = sCada.Substring(0, 50);

                        cmd.Parameters.AddWithValue("@pdescripcion", sCada);

                        cmd.ExecuteNonQuery();


                    }
                }

            }
            catch (Exception e)
            {
                e = e;
            }


            return true;

        }


        public List<videos> ListarEnlace(string codigo)
        {
            List<videos> lVideo = new List<videos>();

            try
            {


                conn = new MySqlConnector.MySqlConnection(cadenaconexion());
                conn.Open();
                using (conn)
                {
                    using (cmd = new MySqlConnector.MySqlCommand("ListarVideos", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@vCodigo", codigo);
                        using (MySqlConnector.MySqlDataAdapter sda = new MySqlConnector.MySqlDataAdapter(cmd))
                        {
                            DataTable dt = new DataTable();
                            sda.Fill(dt);

                            foreach (DataRow variable in dt.Rows)
                            {

                                videos DEnlace = new videos();
                                DEnlace.id = Convert.ToInt32(variable["id"]);
                                DEnlace.codigo = variable["codigo"].ToString();
                                DEnlace.titulo = variable["titulo"].ToString();
                                DEnlace.descripcion = variable["descripcion"].ToString();
                                DEnlace.imagen = variable["imagen"].ToString();

                                lVideo.Add(DEnlace);

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return null;
            }
            return lVideo;
        }

    }
}
