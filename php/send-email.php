<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $telefone = $_POST["telefone"];
    $empresa = $_POST["empresa"];
    $assunto = $_POST["assunto"];
    $data = $_POST["data"];
    $horario = $_POST["horario"];

    $destinatario = "maysaroxcha@gmail.com"; // Coloque seu e-mail aqui
    $assunto_email = "Novo Contato do Site - Infinity X Solutions";

    $mensagem = "
        Nome: $nome\n
        E-mail: $email\n
        Telefone: $telefone\n
        Empresa: $empresa\n
        Assunto: $assunto\n
        Data: $data\n
        Horário: $horario\n
    ";

    $headers = "From: $email\r\nReply-To: $email\r\n";

    if (mail($destinatario, $assunto_email, $mensagem, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
