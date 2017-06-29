//http://www.danstools.com/javascript-obfuscate/index.php
//pagina webservices
var page = "http://localhost:8080";
//pagina inicial de la capa de presentacion
var indexPage = page+"/SantaPublicidadAplicacionEmpresarial/Cliente/";
//roll de administrador
var rollAdmin = 'Gerencia';
//paginas permitidas a usuarios diferentes de gerencia
var OperatorFoldersAllowed = [indexPage+'pages/Proyect/', indexPage+'pages/User/MyUser/'];
//AppLoginAuthentication - webservices de login y autenticacion
var loginService = page+"/SantaPublicidadAplicacionEmpresarial/services/AppLoginAuthentication/login";
var validateLogin = page+"/SantaPublicidadAplicacionEmpresarial/services/AppLoginAuthentication/validation";
var logoutService = page+"/SantaPublicidadAplicacionEmpresarial/services/AppLoginAuthentication/logout";
//AppUsersCRUD - CRUD de usuarios
var createUserService = page+"/SantaPublicidadAplicacionEmpresarial/services/AppUsersCRUD/create";
var userList = page+"/SantaPublicidadAplicacionEmpresarial/services/AppUsersCRUD/list";
var editUserService = page+"/SantaPublicidadAplicacionEmpresarial/services/AppUsersCRUD/update";
var deleteUserService = page+"/SantaPublicidadAplicacionEmpresarial/services/AppUsersCRUD/delete";
//AppAreaCRUD - CRUD de areas
var createAreaService = page+"/SantaPublicidadAplicacionEmpresarial/services/AppAreaCRUD/create";
var areaList = page+"/SantaPublicidadAplicacionEmpresarial/services/AppAreaCRUD/list";
var editAreaService = page+"/SantaPublicidadAplicacionEmpresarial/services/AppAreaCRUD/update";
var deleteAreaService = page+"/SantaPublicidadAplicacionEmpresarial/services/AppAreaCRUD/delete";
//AppRollCRUD - CRUD de roles
var rollList = page+"/SantaPublicidadAplicacionEmpresarial/services/AppRollCRUD/list";
//AppProviderCRUD - CRUD de proveedores
var createProviderService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppProviderCRUD/create';
var providersList = page+"/SantaPublicidadAplicacionEmpresarial/services/AppProviderCRUD/list";
var editProviderService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppProviderCRUD/update';
var deleteProviderService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppProviderCRUD/delete';
//AppCountryCRUD - CRUD de paises
var createCountryService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppCountryCRUD/create';
var countryListService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppCountryCRUD/list';
var editCountryService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppCountryCRUD/update';
var deleteCountryService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppCountryCRUD/delete';
//AppCityCRUD - CRUD de ciudades
var createCityService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppCityCRUD/create';
var citysListService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppCityCRUD/list';
var editCitysService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppCityCRUD/update';
var deleteCityService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppCityCRUD/delete';
//AppAddressCRUD - CRUD de direcciones
var createAddressService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppAddressCRUD/create';
var listAddressService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppAddressCRUD/list';
var editAddressService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppAddressCRUD/update';
var deleteAddressService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppAddressCRUD/delete';
//AppContactCRUD - CRUD de contactos
var createContactService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppContactCRUD/create';
var listContactService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppContactCRUD/list';
var editContactService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppContactCRUD/update';
var deleteContactService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppContactCRUD/delete';
//AppProductServiceCRUD - CRUD de productos y servicios
var createProductServiceService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppProductServiceCRUD/create';
var listProductServiceService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppProductServiceCRUD/list';
var editProductServiceService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppProductServiceCRUD/update';
var deleteProductServiceService = page+'/SantaPublicidadAplicacionEmpresarial/services/AppProductServiceCRUD/delete';
//CRUD de clientes
var clientList = page+"/WebServicesPresupuestos/services/"; //falta
