//http://www.danstools.com/javascript-obfuscate/index.php
//pagina webservices
var page = "http://localhost:8080/SantaPublicidadAplicacionEmpresarial";
//var page = "https://agenciasantaaplicacionempresa.herokuapp.com";
//pagina inicial de la capa de presentacion
var indexPage = page+"/Cliente/";
//roll de administrador
var rollAdmin = 'Gerencia';
//paginas permitidas a usuarios diferentes de gerencia
var OperatorFoldersAllowed = [indexPage+'pages/Proyect/', indexPage+'pages/User/MyUser/'];
//AppLoginAuthentication - webservices de login y autenticacion
var loginService = page+"/services/AppLoginAuthentication/login";
var validateLogin = page+"/services/AppLoginAuthentication/validation";
var logoutService = page+"/services/AppLoginAuthentication/logout";
//AppUsersCRUD - CRUD de usuarios
var createUserService = page+"/services/AppUsersCRUD/create";
var userList = page+"/services/AppUsersCRUD/list";
var editUserService = page+"/services/AppUsersCRUD/update";
var deleteUserService = page+"/services/AppUsersCRUD/delete";
//AppAreaCRUD - CRUD de areas
var createAreaService = page+"/services/AppAreaCRUD/create";
var areaList = page+"/services/AppAreaCRUD/list";
var editAreaService = page+"/services/AppAreaCRUD/update";
var deleteAreaService = page+"/services/AppAreaCRUD/delete";
//AppRollCRUD - CRUD de roles
var rollList = page+"/services/AppRollCRUD/list";
//AppProviderCRUD - CRUD de proveedores
var createProviderService = page+'/services/AppProviderCRUD/create';
var providersList = page+"/services/AppProviderCRUD/list";
var editProviderService = page+'/services/AppProviderCRUD/update';
var deleteProviderService = page+'/services/AppProviderCRUD/delete';
//AppCountryCRUD - CRUD de paises
var createCountryService = page+'/services/AppCountryCRUD/create';
var countryListService = page+'/services/AppCountryCRUD/list';
var editCountryService = page+'/services/AppCountryCRUD/update';
var deleteCountryService = page+'/services/AppCountryCRUD/delete';
//AppCityCRUD - CRUD de ciudades
var createCityService = page+'/services/AppCityCRUD/create';
var citysListService = page+'/services/AppCityCRUD/list';
var editCitysService = page+'/services/AppCityCRUD/update';
var deleteCityService = page+'/services/AppCityCRUD/delete';
//AppAddressCRUD - CRUD de direcciones
var createAddressService = page+'/services/AppAddressCRUD/create';
var listAddressService = page+'/services/AppAddressCRUD/list';
var editAddressService = page+'/services/AppAddressCRUD/update';
var deleteAddressService = page+'/services/AppAddressCRUD/delete';
//AppContactCRUD - CRUD de contactos
var createContactService = page+'/services/AppContactCRUD/create';
var listContactService = page+'/services/AppContactCRUD/list';
var editContactService = page+'/services/AppContactCRUD/update';
var deleteContactService = page+'/services/AppContactCRUD/delete';
//AppProductServiceCRUD - CRUD de productos y servicios
var createProductServiceService = page+'/services/AppProductServiceCRUD/create';
var listProductServiceService = page+'/services/AppProductServiceCRUD/list';
var editProductServiceService = page+'/services/AppProductServiceCRUD/update';
var deleteProductServiceService = page+'/services/AppProductServiceCRUD/delete';
//CRUD de clientes
var createClientService = page+"/services/AppClientCRUD/create";
var clientList = page+"/services/AppClientCRUD/list";
var editClientService = page+"/services/AppClientCRUD/update";
var deleteClientService = page+"/services/AppClientCRUD/delete";

