FROM gitpod/workspace-full

# Install Fly
RUN curl -L https://fly.io/install.sh | sh
ENV FLYCTL_INSTALL="/home/gitpod/.fly"
ENV PATH="$FLYCTL_INSTALL/bin:$PATH"

# Install GitHub CLI
RUN brew install gh
RUN brew install nvm
RUN nvm install 20
RUN nvm run 20
