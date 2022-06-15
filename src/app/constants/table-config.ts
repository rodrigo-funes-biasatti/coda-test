import { MiaColumn } from "@agencycoda/mia-table";

export const TABLE_CONFIG = {
    id: "table_clients",
    loadingColor: 'grey',
    hasEmptyScreen: true,
    emptyScreenTitle: 'No tenes cargado ningun elemento todavia',
    columns: null
}

export const COLUMNS_CONFIGURATION: MiaColumn[] = [
    {
        key: 'user', type: 'user', title: 'Cliente', extra:
        {
            field_firstname: 'firstname', field_lastname: 'lastname', field_is_online: 'is_online'
        }
    },
    { key: 'title', type: 'string', title: 'Email', field_key: 'email', extra: { conditional_field: 'status' } },
    {
        key: 'more', type: 'more', title: 'Acciones', extra: {
            actions: [
                { icon: 'create', title: 'Editar', key: 'edit' },
                { icon: 'delete', title: 'Eliminar', key: 'remove' },
            ]
        }
    },
]