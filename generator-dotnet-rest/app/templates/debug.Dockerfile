# single phase: restore, build, and watch for changes
FROM microsoft/dotnet:2.1-sdk

# installs the debugger
RUN apt-get update && \
    apt-get -y --no-install-recommends install unzip && \
    apt-get -y --no-install-recommends install procps && \
    rm -rf /var/lib/apt/lists/*
RUN curl -sSL https://aka.ms/getvsdbgsh | bash /dev/stdin -v latest -l /vsdbg

EXPOSE 80
VOLUME /src
WORKDIR /src/<%= name %>

ENTRYPOINT dotnet watch run --urls 'http://0.0.0.0:80'
