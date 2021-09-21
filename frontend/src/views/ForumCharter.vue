<template>
<div>
    <MainHeader />
    <div id="content">
        <div id="banner">
            <h1>Règlement du forum</h1>
        </div>
        <div id="rules">
            <h2>Posts et commentaires</h2>
            <ol>
                <li>De façon générale, soyez respectueux lorsque vous rédigez un message.</li>
                <li>Respectez les droits d'auteurs et de la propriété intellectuelle.</li>
                <li>Chaque message devra être écrit dans un français correct, clair et cohérent. Le langage SMS n'est pas autorisé.</li>
                <li>Les propos haineux, injurieux, pornographiques, antisémites, illégaux, diffamatoires, racistes ou discriminant envers une personne ou un groupe de personnes ne sont pas admis. </li>
                <li>Veuillez à ne pas diffuser d'information personnelle dans les posts et commentaires (exemple: coordonnées).</li>
                <li>Les doubles posts (spam) ne sont pas autorisés.</li>
                <li>Les échanges doivent rester professionnels.</li>
                <li>La publicité (commerciales ou non) ou les liens vers des sites externes ne sont pas autorisés.</li>
            </ol>
            <h2>Profil utilisateur</h2>
            <ol>
                <li>Il n'est pas permis d'utiliser une photo de profil qui ne vous appartient pas.</li>
                <li>Votre nom et prénom doivent être correctement renseignés. Il est interdit d'utiliser l'identité d'une autre personne ou un pseudonyme.</li>
                <li>Pensez à mettre à jour vos informations personnelles lorsqu'elles changent (nom de famille, service, etc.).</li>
            </ol>
            <h2>Rôle de l'administrateur</h2>
            <ol>
                <li>L'administrateur du site se réserve le droit de modifier, voire de supprimer, tout post ou commentaire qui ne respecte pas les règles du forum.</li>
                <li>L'administrateur pourra modifier les informations de profil d'un utilisateur si celles-ci ne sont pas correctement renseignées.</li>
                <li>L'administrateur du site se réserve le droit de bannir un utilisateur si celui-ci, malgré un ou plusieurs avertissements, continue d'enfreindre les règles du forum.</li>
                <li>Pour toute question ou réclamation, vous pouvez contacter l'administrateur via l'adresse suivante : <a href="mailto:admin-forum@groupomania.com">admin-forum@groupomania.com</a></li>
            </ol>
        </div>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'

export default ({
    name: 'ForumCharter',
    components: {
        MainHeader
    }
})
</script>

<style lang="scss" scoped>
#banner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
    background-color: #132542;
    color: white;
    & h1 {
        font-size: 40px;
    }
}
#rules {
    padding: 20px 40px;
}
</style>