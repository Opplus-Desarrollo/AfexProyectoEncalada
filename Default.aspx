<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Afex_BryanEncalada._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">



    <div class="panel panel-default">
        <div class="panel-body">

            <div class="row">
                <div class="col-md-9 col-sm-9 col-xs-6">
                    <strong>Añadir enlace</strong>
                    <input id="txtEnlace" class="form-control" />
                </div>
                <div class="col-md-3 col-sm-3 col-xs-6">
                    <a onclick="InsertarEnalce();" class="btn btn-primary" text="Insertar" id="btnGuardar">Insertar
                    </a>

                </div>
            </div>
        </div>
    </div>


    <div class="row">
        <div id="gridVideo">
        </div>


    </div>


    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="mtitulo">Modal title</h4>
                </div>
                <div class="modal-body">

                    <div class="col-md-6 col-sm-6 col-xs-12">

                        <div class="embed-responsive embed-responsive-16by9" id="mFrame">
                        
                        </div>


                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <p id="mDescripcion">...</p>
                    </div>

                </div>
                <div class="modal-footer">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                     
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>

