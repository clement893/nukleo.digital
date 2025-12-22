"""Tests for donateurs endpoints."""

import pytest
from httpx import AsyncClient
from uuid import uuid4
from app.models.organization import Organization


@pytest.mark.asyncio
async def test_create_donateur(
    client: AsyncClient,
    auth_headers: dict,
    test_organization: Organization
):
    """Test creating a donor."""
    response = await client.post(
        "/api/donateurs",
        json={
            "email": "donor@example.com",
            "first_name": "John",
            "last_name": "Doe",
        },
        headers=auth_headers,
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "donor@example.com"
    assert data["first_name"] == "John"
    assert "id" in data


@pytest.mark.asyncio
async def test_list_donateurs(
    client: AsyncClient,
    auth_headers: dict,
    test_organization: Organization
):
    """Test listing donors."""
    response = await client.get(
        "/api/donateurs?skip=0&limit=10",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert "total" in data
    assert isinstance(data["items"], list)


@pytest.mark.asyncio
async def test_list_donateurs_with_filters(
    client: AsyncClient,
    auth_headers: dict,
    test_organization: Organization
):
    """Test listing donors with filters."""
    response = await client.get(
        "/api/donateurs?skip=0&limit=10&is_active=true",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert "items" in data


@pytest.mark.asyncio
async def test_get_donateur(
    client: AsyncClient,
    auth_headers: dict,
    test_organization: Organization
):
    """Test getting a donor by ID."""
    # First create a donor
    create_response = await client.post(
        "/api/donateurs",
        json={
            "email": "getdonor@example.com",
            "first_name": "Jane",
            "last_name": "Smith",
        },
        headers=auth_headers,
    )
    assert create_response.status_code == 201
    donateur_id = create_response.json()["id"]
    
    # Get the donor
    response = await client.get(
        f"/api/donateurs/{donateur_id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == donateur_id
    assert data["email"] == "getdonor@example.com"


@pytest.mark.asyncio
async def test_get_donateur_not_found(client: AsyncClient, auth_headers: dict):
    """Test getting non-existent donor."""
    fake_id = uuid4()
    response = await client.get(
        f"/api/donateurs/{fake_id}",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_donateur(
    client: AsyncClient,
    auth_headers: dict,
    test_organization: Organization
):
    """Test updating a donor."""
    # First create a donor
    create_response = await client.post(
        "/api/donateurs",
        json={
            "email": "updatedonor@example.com",
            "first_name": "Original",
            "last_name": "Name",
        },
        headers=auth_headers,
    )
    assert create_response.status_code == 201
    donateur_id = create_response.json()["id"]
    
    # Update the donor
    response = await client.put(
        f"/api/donateurs/{donateur_id}",
        json={
            "first_name": "Updated",
        },
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["first_name"] == "Updated"


@pytest.mark.asyncio
async def test_delete_donateur(
    client: AsyncClient,
    auth_headers: dict,
    test_organization: Organization
):
    """Test deleting a donor."""
    # First create a donor
    create_response = await client.post(
        "/api/donateurs",
        json={
            "email": "deletedonor@example.com",
            "first_name": "Delete",
            "last_name": "Me",
        },
        headers=auth_headers,
    )
    assert create_response.status_code == 201
    donateur_id = create_response.json()["id"]
    
    # Delete the donor
    response = await client.delete(
        f"/api/donateurs/{donateur_id}",
        headers=auth_headers,
    )
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_create_donation(
    client: AsyncClient,
    auth_headers: dict,
    test_organization: Organization
):
    """Test creating a donation."""
    # First create a donor
    create_donor_response = await client.post(
        "/api/donateurs",
        json={
            "email": "donationdonor@example.com",
            "first_name": "Donation",
            "last_name": "Donor",
        },
        headers=auth_headers,
    )
    assert create_donor_response.status_code == 201
    donateur_id = create_donor_response.json()["id"]
    
    # Create donation
    response = await client.post(
        f"/api/donateurs/{donateur_id}/donations",
        json={
            "amount": 100.0,
            "currency": "EUR",
            "payment_method": "card",
        },
        headers=auth_headers,
    )
    assert response.status_code == 201
    data = response.json()
    assert data["amount"] == 100.0
    assert "id" in data


@pytest.mark.asyncio
async def test_get_donateur_donations(
    client: AsyncClient,
    auth_headers: dict,
    test_organization: Organization
):
    """Test getting donor donations."""
    # First create a donor and donation
    create_donor_response = await client.post(
        "/api/donateurs",
        json={
            "email": "donationsdonor@example.com",
            "first_name": "Donations",
            "last_name": "Donor",
        },
        headers=auth_headers,
    )
    donateur_id = create_donor_response.json()["id"]
    
    await client.post(
        f"/api/donateurs/{donateur_id}/donations",
        json={
            "amount": 50.0,
            "currency": "EUR",
            "payment_method": "card",
        },
        headers=auth_headers,
    )
    
    # Get donations
    response = await client.get(
        f"/api/donateurs/{donateur_id}/donations",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


@pytest.mark.asyncio
async def test_create_interaction(
    client: AsyncClient,
    auth_headers: dict,
    test_organization: Organization
):
    """Test creating an interaction."""
    # First create a donor
    create_donor_response = await client.post(
        "/api/donateurs",
        json={
            "email": "interactiondonor@example.com",
            "first_name": "Interaction",
            "last_name": "Donor",
        },
        headers=auth_headers,
    )
    donateur_id = create_donor_response.json()["id"]
    
    # Create interaction
    response = await client.post(
        f"/api/donateurs/{donateur_id}/interactions",
        json={
            "type": "email",
            "notes": "Test interaction",
        },
        headers=auth_headers,
    )
    assert response.status_code == 201
    data = response.json()
    assert data["type"] == "email"
    assert "id" in data


@pytest.mark.asyncio
async def test_recalculate_score(
    client: AsyncClient,
    auth_headers: dict,
    test_organization: Organization
):
    """Test recalculating donor score."""
    # First create a donor
    create_donor_response = await client.post(
        "/api/donateurs",
        json={
            "email": "scoredonor@example.com",
            "first_name": "Score",
            "last_name": "Donor",
        },
        headers=auth_headers,
    )
    donateur_id = create_donor_response.json()["id"]
    
    # Recalculate score
    response = await client.post(
        f"/api/donateurs/{donateur_id}/recalculate-score",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert "score" in data
    assert "factors" in data

