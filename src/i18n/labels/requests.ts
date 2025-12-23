export const requests = {
  search: {
    placeholder: "Palabra clave",
  },

  filters: {
    filter: "Filtrar",
    remove: "Quitar",
    filterWithCount: "Filtrar ({count})",
    clear: "Limpiar",
  },

  types: {
    unknown: "Tipo desconocido",
  },

  board: {
    emptyState:
      "No hay solicitudes que coincidan con los filtros seleccionados.",
    sections: {
      noResponsible: "Sin responsable",
      inProgress: "En progreso",
      completed: "Terminada",
    },
  },

  actions: {
    seeRequirements: "Requisitos",
    discard: "Descartar",
  },

  takeRequestModal: {
    title: "Tomar solicitud",
    close: "Cerrar",
    description: {
      beforeRequestId: "Acabas de seleccionar la solicitud ",
      requestNumberPrefix: "No.",
      afterRequestId:
        ", puedes ser responsable para su gestión. ¿Estás de acuerdo?",
    },
    actions: {
      visualize: "Solo visualizar",
      takeRequest: "Sí, tomar solicitud",
    },
  },

  modals: {
    selectStaff: {
      title: "Cambiar responsable",
      close: "Cerrar",
      selectPlaceholder: "Selecciona un responsable",
      selectLabel: "Responsable",
      assignMe: "Asignarme a mí como responsable.",
      cancel: "Cancelar",
      save: "Guardar",
    },

    requirements: {
      title: "Requisitos",
      closeButton: "Cerrar",
    },
  },

  flags: {
    assignResponsibleSuccess: {
      title: "Responsable asignado.",
      message: "El nuevo responsable se asignó con éxito.",
    },
  },

  breadcrumbs: {
    home: "Inicio",
    list: "Solicitudes en trámite",
    applicationProcess: "Trámite de solicitud",
  },

  navigation: {
    vinculation: "Vinculación",
  },

  summary: {
    responsible: "Responsable:",
    noResponsible: "Sin responsable",

    requestNumberLabel: "No. de solicitud:",
    requestDateLabel: "Fecha de solicitud:",
    noDate: "Sin Fecha",

    infoTitle: "Información",
    infoReasonTitle: "¿Por qué está inhabilitado?",

    permissions: {
      discard: "No tiene privilegios para descartar solicitudes.",
      requirements: "No tiene privilegios para ver requisitos.",
    },
  },

  taskBoard: {
    pendingTitle: "Tareas por hacer",
    completedTitle: "Tareas hechas",

    emptyState: {
      pending: "No hay ninguna tarea pendiente por ahora.",
      completed: "Ninguna tarea está hecha por ahora.",
    },
  },

  taskCard: {
    noPrivileges: "No tienes privilegios para ejecutar esta tarea.",
    notResponsible: "Debes ser responsable de esta solicitud.",
  },
};
