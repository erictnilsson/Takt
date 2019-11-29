package takt.models.simples;

import java.io.Serializable;

public class SimpleUserActivity implements Serializable {
    private String displayName;
    private boolean isActive;

    public SimpleUserActivity(String displayName, boolean isActive) {
        this.displayName = displayName;
        this.isActive = isActive;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }
}
