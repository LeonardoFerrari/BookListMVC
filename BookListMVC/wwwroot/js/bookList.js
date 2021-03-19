var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/books/getall",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/Books/Upsert?id=${data}" class='btn btn-success text-white' style='cursor:pointer; width:70px;'>
                            Editar
                        </a>
                        &nbsp;
                        <a class='btn btn-danger text-white' style='cursor:pointer; width:70px;'
                            onclick=Delete('/books/Delete?id='+${data})>
                            Excluir
                        </a>
                        </div>`;
                }, "width": "40%"
            }
        ],
        "language": {
            "emptyTable": "Nenhum livro encontrado"
        },
        "width": "100%"
    });
}


function Delete(url) {
    swal.fire({
        title: "Você tem certeza que deseja excluir esse livro?",
        text: "Uma vez deletado, o item não poderá ser recuperado",
        icon: "warning",
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) { // Ou seja, se o usuário realmente desejar excluir o item
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(message);
                    }
                }
            });
        }
    });
}