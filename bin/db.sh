# Database server management script
# @author wpomier 2021-12-06 10:44

BIN_DIR="$(realpath "`dirname "$0"`")"
FIREBIRD_DIR="$BIN_DIR/../db"

start_fbserver() {
    sudo docker run \
        --name firebird \
        -d \
        -p 3050:3050 \
        -v "${FIREBIRD_DIR}:/firebird" \
        -e "FIREBIRD_USER=minnow" \
        -e "FIREBIRD_PASSWORD=minnow" \
        -e "FIREBIRD_DATABASE=minnow.fdb" \
        -e "ISC_PASSWORD=masterkey" \
        -e "EnableLegacyClientAuth=true" \
        -e "TZ=+00:00" \
        jacobalberty/firebird:3.0
}

stop_firebird() {
    sudo docker stop firebird
    sudo docker rm firebird
}

create_database() {
    cat "$BIN_DIR/create-tables.sql" | sudo docker exec -i firebird /usr/local/firebird/bin/isql
}

isql() {
    sudo docker exec -ti firebird /usr/local/firebird/bin/isql "$@"
}

CMD="$1"
shift

case "$CMD" in
    start)      start_fbserver;;
    stop)       stop_firebird;;
    createdb)   create_database;;
    isql)       isql "$@";;
    *)  echo "Invalid command '$CMD'. Only start|stop|createdb|isql are permitted." >&2;;
esac