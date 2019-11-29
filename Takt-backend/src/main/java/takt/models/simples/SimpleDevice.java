package takt.models.simples;

import java.io.Serializable;

public class SimpleDevice implements Serializable {
    private String id;
    private Boolean isActive;
    private Boolean isRestricted;
    private String name;
    private String type;

    public SimpleDevice() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }

    public Boolean getIsRestricted() {
        return isRestricted;
    }

    public void setIsRestricted(Boolean restricted) {
        isRestricted = restricted;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
