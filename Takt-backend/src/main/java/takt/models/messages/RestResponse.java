package takt.models.messages;

import java.io.Serializable;

public class RestResponse implements Serializable {
    private Object response;

    public RestResponse(Object response) {
        this.response = response;
    }

    public Object getResponse() {
        return response;
    }

    public void setResponse(Object response) {
        this.response = response;
    }
}
